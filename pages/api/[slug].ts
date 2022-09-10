import { NextApiRequest, NextApiResponse } from "next";
import { getStakedUser } from "../../utils/stakedQuery";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { slug: string };
  try {
    const staked = await getStakedUser(slug);
    res.setHeader('Access-Control-Allow-Credentials', 1)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    res.json(staked);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};
