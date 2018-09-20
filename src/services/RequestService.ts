import { User } from '@/models/User';

/**
 * Database
 */
export const users: any = [
    {id: 0, idCode: '1234567', firstName: 'Gianni', lastName: 'Versace', email: 'box@versace.com'},
    {id: 1, idCode: '5326779', firstName: 'Christian', lastName: 'Dior', email: 'box@dior.com'},
    {id: 2, idCode: '3256721', firstName: 'Coco', lastName: 'Chanel', email: 'box@chanel.com'},
    {id: 3, idCode: '8866421', firstName: 'Giorgio', lastName: 'Armani', email: 'box@armani.com'},
    {id: 4, idCode: '4353457', firstName: 'Domenico', lastName: 'Dolce', email: 'box@dolcegabbana.com'},
    {id: 5, idCode: '4353457', firstName: 'Stefano', lastName: 'Gabbana', email: 'box@dolcegabbana.com'},
];

/**
 * The RequestService imitates an ajax-request to backend
 */
class RequestService {
    private users = users;

    public getUsers(filter?: string): Promise<User[]> {
        let filteredUsers = this.users;
        if (filter && filter.length) {
            const subrow = filter.toLowerCase();
            filteredUsers = this.users.filter((item: User) => {
                return item.firstName.toLowerCase().indexOf(subrow) > -1 ||
                        item.lastName.toLowerCase().indexOf(subrow) > -1 ||
                        item.email.toLowerCase().indexOf(subrow) > -1;
            });
        }
        return Promise.resolve(filteredUsers as User[]);
    }

    public removeUser(userId: number) {
        const index = this.users.findIndex((user: User) => +user.id === +userId);
        if (index === -1) { return; }
        this.users.splice(index, 1);
    }

    public getUserDetails(userId: number): Promise<User|null> {
        const index = this.users.findIndex((user: User) => +user.id === +userId);
        if (index === -1) {
            return Promise.resolve(null);
        }
        return Promise.resolve(this.users[index]);
    }

    public updateUser(updatedUser: User): Promise<User> {
        const index = this.users.findIndex((user: User) => +user.id === +updatedUser.id);
        this.users[index] = updatedUser;
        return Promise.resolve(this.users[index]);
    }

    public addUser(user: User): Promise<User> {
        user.id = this.users.length;
        this.users.push(user);
        return Promise.resolve(this.users[this.users.length - 1]);
    }
}
export const Request = new RequestService();

