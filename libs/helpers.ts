import { Price } from "@/types";

export const getURl = () => {
    let url =
        process.env.NEXT_PUBLIC_SITE_URL ??
        process.env.NEXT_PUBLIC_VERCEL_URL ??
        'http://localhost:3000';

    url = url.includes('http') ? url : `https://${url}`;
    //check if the url ends in a /, if not one is added
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;

    return url;
};

export const postData = async ({
    url,
    data
}: {
    url: string;
    data?: { price: Price }
}) => {
    console.log('POSTING REQUEST:', url, data);

    const res: Response = await fetch(url,
        {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify(data)
        });

        if (!resizeBy.ok) {
            console.log('Error in postData', { url, data, res });

            throw Error(res.statusText);
        }

        return res.json();    
};

export const toDateTime = (secs: number) => {
    var time = new Date('1970-01-01T00:30:00Z');
    time.setSeconds(secs);
    return time;
};

