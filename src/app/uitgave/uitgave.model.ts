import { Month } from "../months/month.model";

export class Uitgave{
    public maand: Month;
    public onderwerp: string;
    public datum: string;
    public totaal: number;

    constructor(maand: Month, onderwerp: string, datum: string, totaal: number){
        this.maand = maand;
        this.onderwerp = onderwerp;
        this.datum = datum;
        this.totaal = totaal;
    }
}