export class HeaderLink {
    route: string;
    label: string;
    isActive: boolean;

    constructor(cons: Partial<HeaderLink>) {
        Object.assign(this, cons);
    }
}