export class ConfirmDto {
    email: string;
    code: string;
    constructor() {
        this.email = "";
        this.code = "";
    }
}