const DOMObjectSpecies = ["paragraph", "text"] as const

type DOMObjectType = typeof DOMObjectSpecies[number]

type DOMObjectChildren<T> = T extends "text" ? string : DOMObjectPrimitive<DOMObjectType>[]

interface DOMObjectPrimitive<T extends DOMObjectType> {
  type: T 
  value: DOMObjectChildren<T>
}

const x1: DOMObjectPrimitive<"paragraph"> = {
  type: "paragraph",
  value: [
    {
      type: "text",
      value: "string"
    }
  ]
}

class DOMTransformer {

}

export default DOMTransformer
