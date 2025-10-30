

import InvolveSection from "@/components/involve-section"
import { getChildren } from "@/actions/sponsor"



export default async function Page() {
    const children = (await getChildren()) ?? [];

    console.log(children)
  

  return (
    <div className="min-h-screen">
     <InvolveSection children={children}/>
    </div>
  )
}
