// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

type ErrRes = {
    message: string;
};

type ReqBody = {
    email: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | ErrRes>
) {
    const token = process.env.SANITY_TOKEN;
    const sanityProjectId = process.env.SANITY_PROJ_ID;
    const sanityUrl = `https://${sanityProjectId}.api.sanity.io/v2021-10-21/data/mutate/test`;

    // Only process post requests
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" });
    }

    // Parse Body and handle errors
    const body: ReqBody = JSON.parse(req.body);
    if (!body.email) {
        res.status(400).json({ message: "Invalid request, email is required" });
    }

    const mutations = {
        mutations: [
            {
                createOrReplace: {
                    _type: "user",
                    email: body.email,
                },
            },
        ],
    };

    // Add a new user
    fetch(sanityUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "Application/JSON",
        },
        method: "POST",
        body: JSON.stringify(mutations),
    })
        .then((res) => res.json())
        .then((data) => res.status(201).json(data))
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
}
