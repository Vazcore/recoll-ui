// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import ResultFile from '../models/result-file'
import { exec } from "child_process";
import { Types } from '../../types/file-type';

export type SearchDataResponse = {
  items: Array<ResultFile>
}

const execSearch = (req: NextApiRequest): Promise<Array<ResultFile>> => {
  return new Promise((resolve) => {
    const type = (req.query?.t || Types.ALL) === Types.ALL ? "-l" : "-f";
    exec(`recoll -q -t ${type} '${req.query.q}'`, (error, stdout, stderr) => {
      if (error || stderr) {
        resolve([]);
      } else {
        const results = stdout.split("results\n")[1].split("\n");
        console.log(results.length);
        if (results.length < 2) {
          console.log("No results");
          resolve([]);
        } else {
          //const [type, path, name, size] = results;
          const items = results.splice(0, results.length - 1).map(item => {
            const [type, path, name, size] = item.split("\t");
            return new ResultFile({ name, path, type, size: Number(size) });
          });
          resolve(items);
        }
      }    
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchDataResponse>
) {
  const items = await execSearch(req);
  res.status(200).json({ items });
}
