export class Month{
    public maand: string;
    public jaar: number;
    public amount: number;

    constructor(maandNaam: string, jaar: number, inkomst: number){
        this.maand = maandNaam;
        this.jaar = jaar;
        this.amount = inkomst;
    }
}