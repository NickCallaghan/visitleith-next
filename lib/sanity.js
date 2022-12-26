import { createClient } from "next-sanity";

export const sanityClient = createClient({
    projectId: "0kjphiot",
    dataset: "test",
    apiVersion: "2021-10-21",
    useCdn: false,
});
