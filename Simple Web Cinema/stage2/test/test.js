import path from 'path';
const pagePath = path.join(import.meta.url, '../../src/index.html');
import {StageTest, correct, wrong} from 'hs-test-web';

class Test extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
            // test #1
        }),
        this.page.execute(() => {
            // test #2
        }),
        this.page.execute(() => {
            // test #3
        })
    ]

}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);
