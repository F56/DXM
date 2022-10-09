import fs from 'fs';
import path from 'path';


export function removeTorrent(torrentName: string) {
    const torrentPath = path.join(__dirname, 'public', 'torrents');
    fs.rmdirSync(path.join(torrentPath, torrentName), { recursive: true });
}