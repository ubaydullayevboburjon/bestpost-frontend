export class ResetDto {
    oldPassword: String;
    newPassword: String;
    constructor() {
        this.oldPassword = "";
        this.newPassword = "";
    }
}