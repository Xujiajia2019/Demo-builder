import Link from 'next/link';
import { supabase } from '/api'
export const dynamic = 'force-dynamic'

export default async function Projects() {
  async function hostNames () {
    let {data, error} = await supabase
    .from('Page data')
    .select('host', 'created_at')
    .order('created_at', { ascending: false })
    if (data) {
      return data.map(item => item.host)
    } else {
      throw new Error(error)
    }
  }
  const initialData = await hostNames()

  return (
    <section>
      <div className="hero min-h-screen">
        <div className=""></div>
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">My projects</h1>
            {initialData.map((item, index) => (
              item && !item.includes('localhost') ? 
              <div key={index}>
                <Link target="_blank" href={`https://${item}`}>
                  {`https://${item}`}
                </Link>
              </div> : null
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
