import * as cron from 'node-cron';
import { GroupedCommands } from './GroupedCommands';

export class CronJobs {
    static initCron() {
        console.log('[CronManager] Début des tâches cron\n')
        cron.schedule('0 0 * * *', async () => {
            console.log('[CronManager] Lancement de la tâche cron\n')
            await GroupedCommands.createGroupedCommands()
        });
    }
}