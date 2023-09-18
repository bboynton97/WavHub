import {randomBytes} from "crypto";
// import {AdminConfigModel, UserModel} from "../models";
// import {AdminConfig, TimeSeriesData, User} from "types";

export function generateOtpCode(): string {
    let code: string = "";

    do {
        code += randomBytes(3).readUIntBE(0, 3);
    } while (code.length < 6);

    return code.slice(0, 6);
}

// min (inclusive) - max (non-inclusive)
export function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) ) + min;
}

// export async function refreshUser(user: User | undefined): Promise<User | undefined> {
//     if (!user) return undefined
//     return await UserModel.findById(user._id) as User
// }

// export async function isAdmin(user: User | undefined): Promise<boolean> {
//     user = await refreshUser(user)
//     if (!user?.role) return false
//     return user.role === 'admin'
// }

// export async function configForName(name: string): Promise<any> {
//     const config = await AdminConfigModel.findOne({name}) as AdminConfig
//     return config.value
// }

export function imageSourceFromPodcastRss(rss: any): string {
    return rss.rss?.channel?.image?._href
        || rss.rss?.channel?.image[0]._href
        || rss.rss?.channel?.image[0].url
}

export const encodeBase64 = (data: any) => {
    return Buffer.from(data).toString('base64');
}
export const decodeBase64 = (data: any) => {
    return Buffer.from(data, 'base64').toString('ascii');
}

// export function getOpenAIClient(): OpenAIApi {
//     require('dotenv').config();
//     const configuration = new Configuration({
//         organization: "org-XWB3bBbWG8BfhYCJnraAt48Z",
//         apiKey: process.env.OPENAI_API_KEY,
//     });
//     return new OpenAIApi(configuration);
// }
// export function getMockOpenAIClient(): OpenAIApi {
//     return {
//         createCompletion: jest.fn(() => {
//             return {
//                 data: {
//                     choices: [
//                         {
//                             text: 'this is a test completion'.split(''),
//                         },
//                     ],
//                 }
//             };
//         }),
//     } as any as OpenAIApi
// }

export function safeObjectLiteralAccess(obj: any, keys: any[]) {
    let result = obj
    for (const key of keys) {
        if (result[key]) {
            result = result[key]
        } else {
            return undefined
        }
    }
    return result
}

// export function getTestDatabaseConnection() {
//     require('dotenv').config();
//     return knex({
//         client: 'postgresql',
//         connection: {
//             host : process.env.PG_HOST,
//             user : process.env.PG_USER,
//             password : process.env.PG_PASSWORD,
//             database : process.env.PG_DATABASE,
//             port: Number(process.env.PG_PORT)
//         },
//         pool: {
//             min: 2,
//             max: 10
//         }
//     });
// }

export function iso8601ToSeconds(iso8601Duration:string) {
    const iso8601DurationRegex = /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?/;
    const matches = iso8601Duration.match(iso8601DurationRegex);

    if (matches === null) {
        throw new Error('Invalid ISO8601 duration');
    }

    const duration = {
        sign: matches[1] === undefined ? '+' : '-',
        years: matches[2] === undefined ? 0 : Number(matches[2]),
        months: matches[3] === undefined ? 0 : Number(matches[3]),
        weeks: matches[4] === undefined ? 0 : Number(matches[4]),
        days: matches[5] === undefined ? 0 : Number(matches[5]),
        hours: matches[6] === undefined ? 0 : Number(matches[6]),
        minutes: matches[7] === undefined ? 0 : Number(matches[7]),
        seconds: matches[8] === undefined ? 0 : Number(matches[8])
    };

    return (duration.years * 31622400)
    + (duration.months * 2628000)
    + (duration.weeks * 604800)
    + (duration.days * 86400)
    + (duration.hours * 3600)
    + (duration.minutes * 60)
    + (duration.seconds * 1);
}

// export function countEventsByPeriod(events: string[], period: 'month' | 'day'): TimeSeriesData {
//     const eventCounts: Record<string, number> = {};
//
//     for (const event of events) {
//         const date = new Date(event);
//         let periodKey: string;
//
//         if (period === 'month') {
//             periodKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // Month is 0-based
//         } else if (period === 'day') {
//             periodKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
//         } else {
//             // Handle invalid period value
//             throw new Error('Invalid period value. Use "month" or "day".');
//         }
//
//         if (eventCounts[periodKey]) {
//             eventCounts[periodKey]++;
//         } else {
//             eventCounts[periodKey] = 1;
//         }
//     }
//
//     const periods: string[] = [];
//     const counts: number[] = [];
//
//     for (const periodKey in eventCounts) {
//         if (eventCounts.hasOwnProperty(periodKey)) {
//             periods.push(periodKey);
//             counts.push(eventCounts[periodKey]);
//         }
//     }
//
//     return { periods, counts };
// }
