<template>
    <div>
        <h1>Hello from index page</h1>
        <div>
            <button @click="initUsers">Init Users</button>
        </div>
        <div>
            <button @click="changeAuth('root')">Use ROOT</button>
            <button @click="changeAuth('ns')">Use NS</button>
            <button @click="changeAuth('db')">Use DB</button>
        </div>
        <h2>Current Scope: {{ title }}</h2>
        Root:
        <pre>
            {{ dataRoot }}
        </pre>
        NS:
        <pre>
            {{ dataNS }}
        </pre>
        DB:
        <pre>
            {{ dataDB }}
        </pre>
    </div>
</template>

<script setup lang="ts">
const db = useNuxtApp().$db
const dataRoot = ref()
const dataNS = ref()
const dataDB = ref()
const title = ref('ROOT')

await db.signin({
    username: 'root',
    password: 'root',
})

const initUsers = async () => {
    await db.query(`USE NS test; DEFINE USER username ON NAMESPACE PASSWORD '123456' ROLES OWNER;`)
    await db.query(`USE NS test DB test; DEFINE USER username ON DATABASE PASSWORD '123456' ROLES OWNER;`)
}
const changeAuth = async (scope: string) => {
    switch (scope) {
        case 'root':
            title.value = 'ROOT'
            await db.invalidate()
            dataRoot.value = ''
            dataNS.value = ''
            dataDB.value = ''
            await db.signin({
                username: 'root',
                password: 'root',
            })
            await queryInfo()
            break;

        case 'ns':
            title.value = 'NS'
            await db.invalidate()
            dataRoot.value = ''
            dataNS.value = ''
            dataDB.value = ''
            await db.signin({
                username: 'username',
                password: '123456',
                namespace: 'test'
            })
            await queryInfo()
            break
        case 'db':
            title.value = 'DB'
            await db.invalidate()
            dataRoot.value = ''
            dataNS.value = ''
            dataDB.value = ''
            await db.signin({
                username: 'username',
                password: '123456',
                namespace: 'test',
                database: 'test'
            })
            await queryInfo()
            console.log(await db.query('info for table person'))
            console.log(await db.query('show changes for table person'))
            break
    }
}

const queryInfo = async () => {
    try {
        dataRoot.value = await db.query('Info for root')
    } catch (error) {
        console.log(error.message)
        console.error('could not get root data: ', error)
    }
    try {
        dataNS.value = await db.query('Info for ns')
    } catch (error) {
        console.error('could not get ns data: ', error)
    }
    try {
        dataDB.value = await db.query('Info for db')
    } catch (error) {
        console.error('could not get db data: ', error)
    }

}
await queryInfo()
</script>
