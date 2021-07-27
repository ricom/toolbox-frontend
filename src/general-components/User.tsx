class User {
    private id: number;
    private username: string;
    private email: string;
    private anonymous: boolean;
    private created_at: Date;

    constructor(id: number, username: string, email: string, anonymous: boolean,
                created_at: Date) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.anonymous = anonymous;
        this.created_at = created_at;
    }

    static from(data: any): User {
        return new User(data.id, data.username, data.email, data.anonym, data.created_at);
    }

    isAnonymous = (): boolean => {
        return this.anonymous;
    }

    getID(): number {
        return this.id;
    }

    setID(value: number) {
        this.id = value;
    }

    getUsername(): string {
        return this.username;
    }

    setUsername(value: string) {
        this.username = value;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(value: string) {
        this.email = value;
    }

    setAnonymous(value: boolean) {
        this.anonymous = value;
    }

    getcreatedAt(): Date {
        return this.created_at;
    }

    setcreatedAt(value: Date) {
        this.created_at = value;
    }
}

export {
    User
}