import { InMemoryDbService } from 'angular-in-memory-web-api';

import { User } from './user';
import { getLocaleFirstDayOfWeek } from '@angular/common';

export class UserData implements InMemoryDbService {
    createDb() {
        const users: User[] = [
            {
                id: 1,
                userName: 'Geoff',
                isAdmin: true
            },
            {
                id: 2,
                userName: 'Joanna',
                isAdmin: false
            }
        ];
        return { users };
    }
}
