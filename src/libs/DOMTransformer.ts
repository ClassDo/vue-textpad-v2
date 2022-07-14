import { h, VNode, VNodeTypes } from "vue"

const DOMObjectSpecies = ["paragraph", "text"] as const


type DOMObjectType = typeof DOMObjectSpecies[number]
type DOMObjectTypeWithProps<T extends DOMObjectType = DOMObjectType>= {
  type: string 
  props?: DOMPropsType
}
type DOMPropsType = {
  id?: string
  class?: string
}

type DOMObjectSpeciesMapType<T extends DOMObjectType = DOMObjectType> = Map<T, DOMObjectTypeWithProps>

const DOMObjectSpeciesMap: DOMObjectSpeciesMapType = new Map([[
  "text",
  {
    type: "span"
  }],
  ["paragraph", {
     type: "p"
  }]
])


type DOMObjectChildren<T> = T extends "text" ? string : DOMObject<DOMObjectType>[]

interface DOMObject<T extends DOMObjectType = DOMObjectType> {
  id: string
  type: T 
  value: DOMObjectChildren<T>
}

const x1: DOMObject<"paragraph"> = {
  id: "id1",
  type: "paragraph",
  value: [
    {
      id: "id2",
      type: "text",
      value: "string"
    } as DOMObject<"text">
  ]
}

interface DOMTransformerArgs {
  dom: DOMObject
}

// All parameters inside DOMTransformer should be constructive from args
class DOMTransformer implements DOMTransformerArgs {
  dom
  constructor(args: DOMTransformerArgs) {
    this.dom = args.dom
  }
  generate(): VNode | undefined {
    const domType = DOMObjectSpeciesMap.get(this.dom.type)
    if (!domType) return

    if(this.dom.type === "text") {
      return h(domType.type, {...domType.props, innerHTML: this.dom.value } )
    } 
    return h(domType.type, { ...domType.props }, (this.dom.value as DOMObjectChildren<unknown>).map(x => new DOMTransformer({dom: x}).generate())])
  }
}

export default DOMTransformer
