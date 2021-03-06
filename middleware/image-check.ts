import { Response, Request, NextFunction } from 'express';
import fs from 'fs';
import { HttpError } from '../models/http-error';
const imageCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const fileName: string = req.query.filename as string;
  const width = req.query.width as unknown as number;
  const height = req.query.height as unknown as number;

  let dir = './assets/full';
  const imageExistOnFull = fs.existsSync(`${dir}/${fileName}.jpg`);
  if (imageExistOnFull) {
    dir = './assets/thumb';
    const imagePath = `${dir}/${fileName}-${width}x${height}.jpg`;
    const imageExistOnThumb = fs.existsSync(imagePath);
    if (imageExistOnThumb) {
      return res.status(200).sendFile(imagePath, {
        root: './'
      });
    } else {
      return next();
    }
  } else {
    return next(
      new HttpError(
        'Image does not Exist on disk, Please try Another image.',
        400
      )
    );
  }
};

export default imageCheck;
