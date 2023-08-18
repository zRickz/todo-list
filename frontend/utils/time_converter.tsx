export default function Converter(timestamp: Date){
    const new_timestamp = new Date(timestamp);
    return `${new_timestamp.getDate()}/${new_timestamp.getMonth()+1}/${new_timestamp.getFullYear().toString().substring(-2)} às 
            ${new_timestamp.getHours()}:${new_timestamp.getMinutes()}`
}
