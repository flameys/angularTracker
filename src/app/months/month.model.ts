export class Month{
    public id?: number
    public maand: string;
    public jaar: number;
    public amount: number;

    constructor(maandNaam: string, jaar: number, inkomst: number, id?: number){
        this.maand = maandNaam;
        this.jaar = jaar;
        this.amount = inkomst;
        this.id = id;
    }
}