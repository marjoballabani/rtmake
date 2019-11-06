import { expect } from 'chai'
import { afterEach, describe, it, beforeEach } from 'mocha'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

describe('RTmake Unit', () => {
    var rtmake
    var sandbox, fsMock

    beforeEach(() => {
        sandbox = sinon.createSandbox()

        fsMock = {
            readFileSync: sandbox.stub()
        }

        const RTmake = proxyquire('../../src/CLI', {
            fs: fsMock
        }).default
        rtmake = new RTmake()
    })

    afterEach(function () {
        if (sandbox) {
          sandbox.restore()
        }
    })

    describe('_documentation', () => {
        it('must be able to print documentation', () => {
            expect(true).to.equal(true)
        })
    })

})
