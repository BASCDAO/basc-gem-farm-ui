import { NextApiRequest, NextApiResponse } from "next";
import { getStakedUser } from "../../utils/stakedQuery";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { slug: string };
  try {
    const staked = await getStakedUser(slug);
    res.json(staked);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};