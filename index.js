const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

(async () => {
    const random = await import('random');

    const FILE_PATH = './data.json';

    const makeCommit = async (n) => {
        if (n === 0) return await simpleGit().push();

        const x = random.default.int(0, 54); // Use .default because it's a default export in ES module
        const y = random.default.int(0, 6);

        const DATE = moment().subtract(1, 'y').add(1, 'd')
            .add(x, 'w').add(y, 'd').format();

        const data = { date: DATE };
        console.log(DATE);

        await jsonfile.writeFile(FILE_PATH, data);
        await simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE });

        makeCommit(--n);
    };

    makeCommit(400);
})();
