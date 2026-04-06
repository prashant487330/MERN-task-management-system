const randomPassword=()=>{
    let Pass="";
    let string="abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&";
    let stringLength=string.length;
    for(var i=0;i<=7;i++){
        let randomno=Math.floor(Math.random()*stringLength);
        Pass=Pass+string.charAt(randomno);
    }
    return Pass;
}
module.exports={
    randomPassword
}