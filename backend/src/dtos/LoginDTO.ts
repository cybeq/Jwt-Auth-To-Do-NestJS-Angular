export interface ILoginDTO {
    email: Exclude<NonNullable<string>, ''>;
    password: Exclude<NonNullable<string>, ''>;

}