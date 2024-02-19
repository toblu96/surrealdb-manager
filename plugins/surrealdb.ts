import { Surreal } from 'surrealdb.js';

const db = new Surreal();

export default defineNuxtPlugin({
    name: 'surrealdb',
    enforce: 'pre', // or 'post'
    async setup(nuxtApp) {
        try {
            // Connect to the database
            await db.connect(`${useRuntimeConfig().public.surrealdb_base_url}/rpc` || 'http://127.0.0.1:8000/rpc', {
                // Set the namespace and database for the connection
                // namespace: 'nope',
                // database: 'nope',

                // Set the authentication details for the connection
                // auth: {
                //     namespace: 'test',
                //     database: 'test',
                //     scope: 'user',
                //     username: 'info@surrealdb.com',
                //     password: 'my-secret-password',
                // },
            });


        } catch (e) {
            console.error('ERROR', e);
        }

        return {
            provide: {
                db
            }
        }
    },
})
