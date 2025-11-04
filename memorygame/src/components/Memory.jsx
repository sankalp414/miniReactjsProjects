import  { useEffect, useState } from 'react'

const Memory = () => {
    const [gridSize,setGridSize] = useState(4)
    const [cards,setCards] = useState([])

    const [flipped,setFlipped] = useState([])
    const [solved,setSolved] = useState([])
    const [disabled,setDisabled] = useState(false)

    const [won,setWon] = useState(false)
    
    const handleGridSizeChange= (e)=>{
        const size = parseInt(e.target.value)
        if(size >= 2 && size<= 10) setGridSize(size)
    }
    
    const initialiseGame=()=>{
        const totalCards = gridSize * gridSize;
        const pairCount = Math.floor(totalCards/2)
        const numbers = [...Array(pairCount).keys()].map((n)=> n+1)
        const shuffledCards = [...numbers,...numbers]
        .sort(()=> Math.random() - 0.5)
        .slice(0,totalCards)
        .map((number,index)=>({id:index,number}))

        setCards(shuffledCards)
        setFlipped([])
        setSolved([])
        setWon(false)
    }


    useEffect(()=>{
        initialiseGame()
    },[gridSize])
    
    const  handleClick = (id)=>{
      if(disabled || won) return
      if(flipped.length === 0){
        setFlipped([id])
        return
      }
    }
    
    



  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-grey-100 p-4'>
        <h1 className='text-3xl font-bold mb-6'>Memory Game</h1>
      {/* input */}
        <div>
            <label htmlFor="gridSize"> Grid Size : (max: 10) </label>
            <input 
                type='number' 
                id='gridSize' 
                min='2' 
                max='10' 
                value={gridSize}
                onChange={handleGridSizeChange}
                className='border-2 border-gray-100 rounded px-2 py-1'
                />
        </div>


      {/* gameboard */}

        <div className={`grid gap-2 mb-4`}
            style={{
                gridTemplateColumns:`repeat(${gridSize}, minmax(0,1fr))`,
                width:`min(100%,${gridSize*5.5}rem)`
        }}
        >

            {cards.map((card)=>{
                return <div key={card.id } 
                className='aspect-square flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition-all duration-300 bg-gray-300 text-gray-400'
                onClick={()=>handleClick(card.id)}>
                  {card.number}
                </div>
            })}
        </div>


      {/* result */}



      {/* reset button */}



    </div>
  )
}

export default Memory
