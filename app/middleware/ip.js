import { json } from "@remix-run/node";

export function getIp(request) {
    let ip = request.headers.get('x-forwarded-for') || request.connection.remoteAddress;
    if(ip.includes(',')) 
        ip = ip.split(',')[0];

    if(!ip)
        throw json({ message: "No ip address"}, { status: 400});

    return ip;
}