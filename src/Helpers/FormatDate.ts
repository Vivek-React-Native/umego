import moment from 'moment';


export function formatDate(date:string, frmat:string){
    let formattedDate = (moment(date)).format(frmat)
    return formattedDate;
}