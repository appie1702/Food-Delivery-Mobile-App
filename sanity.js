import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
    projectId: 'cl71i045',
    dataset: 'production',
    useCdn: true,
    apiVersion: "2021-10-21",

});

const builder = imageUrlBuilder(client);
export const urlfor = (source) => builder.image(source);

export default client;