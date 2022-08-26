// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class ArithmeticsController {
    public add(a:number,b:number){return (a+b)}
    public sub(a:number,b:number){return (a-b)}
    public mul(a:number,b:number){return (a*b)}
    public div(a:number,b:number){return(a/b)}

  public async cal ({request}){
    const a=request.input('a')
    const b=request.input('b')
    return this.add(a,b)+" " +"\n" +
           this.sub(a,b)+" " +"\n" +
           this.mul(a,b)+" " +"\n" +
           this.div(a,b)

  }

}
