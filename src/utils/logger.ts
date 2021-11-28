//  used to create logs in terminal instead of using console.log

import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
    prettyPrint: true,
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
})
export default log;
