const actions = require('@actions/core')
const got = require('got')
const path = require('path')
const { promisify } = require('util')
const fs = require('fs')
const stream = require('stream')
 
const pipeline = promisify(stream.pipeline);

const archs = {
    ia32: 'x86',
    x64: 'x86_64',
    arm: 'armv7',
    arm64: 'arm64',
}

const platforms = {
    darwin: 'darwin',
    win32: 'win32',
    linux: 'linux',
}

const getPlatform = () => {
    const { platform, arch } = process
    return `${archs[arch] || 'x86_64'}-${platforms[platform] || 'linux'}`
}

(async () => {
    let version
    let sha1 = actions.getInput('sha1')
    let platform = getPlatform()

    if (!sha1 || sha1.length != 40) {
        const info = await got(`http://d.defold.com/${sha1 || 'stable'}/info.json`).json()
        sha1 = info.sha1
        version = info.version
    }

    const dir = path.resolve(actions.getInput('dir') || '.defold')
    await fs.promises.mkdir(dir, { recursive: true })

    const displayVersion = version ? ` (${version})` : ''

    console.log(`Downloading dmengine_headless ${sha1}${displayVersion} for ${platform}...`)
    const dmenginePath = path.join(dir, 'dmengine_headless')
    await pipeline(
        got.stream(`http://d.defold.com/archive/${sha1}/engine/${platform}/dmengine_headless`),
        fs.createWriteStream(dmenginePath, { mode: 0o777 })
    )

    console.log(`Downloading bob.jar ${sha1}${displayVersion}...`)
    const bobPath = path.join(dir, 'bob.jar')
    await pipeline(
        got.stream(`http://d.defold.com/archive/${sha1}/bob/bob.jar`),
        fs.createWriteStream(bobPath, { mode: 0o777 })
    )

    actions.exportVariable('BOB', bobPath)
    actions.addPath(dir)
    actions.setOutput('sha1', sha1)
    actions.setOutput('version', version)
    actions.setOutput('path', dir)
    actions.setOutput('bob', bobPath)
    actions.setOutput('dmengine', dmenginePath)
})().catch(console.error)
