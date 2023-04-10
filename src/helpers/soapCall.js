import axios from "axios";
import {DOMParser} from 'xmldom';

export default soapCalll = async (endpoint, service, body) => {
    try {
        body = JSON.stringify(body)
        var xml = `
            <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:portalipc2">
                <soapenv:Header/>
                <soapenv:Body>
                <urn:${service} soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                    <in_param xsi:type="xsd:string">${body}</in_param>
                </urn:${service}>
                </soapenv:Body>
            </soapenv:Envelope>
        `;
    
        const response = await axios.post(
            endpoint,
            xml,
            {
              headers: {
                'Content-Type': 'text/xml',
              },
            },
        );
        
        const parser = new DOMParser();
        var data = parser.parseFromString(response.data, 'text/xml');
        data = data.getElementsByTagName(`return`)[0].firstChild.data
        data = JSON.parse(data)

        return data
    } catch (error) {
        console.error(error);
        throw error;
    }
}