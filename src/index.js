import RTmake from './CLI'

export const cli = (args) => {
const rtMake = new RTmake()
    rtMake.execute(args)
}
