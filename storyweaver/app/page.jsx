export default function Home(){
  return(
    <div className="bg-linear-to-b from-orange-300 via-white to-green-700 flex min-h-screen justify-center items-center">
      <h1 className="text-4xl text-blue-900 text-center font-semibold p-10">Welcome to StoryWeaver ! Let's preserve our culture together.</h1>
    </div>
  )
}

import Button from '@/components/button';

export default function Page() {
  const regions = ["South Asia", "Europe", "North America", "Australia"];

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      
      {/* Responsive Container Logic:
        - flex-col : Stacks vertically by default (Mobile)
        - md:flex-row : Switches to side-by-side on medium screens (Desktop)
      */}
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        
        {regions.map((region) => (
          <Button key={region} text={region} />
        ))}
        
      </div>
    </main>
  );
}