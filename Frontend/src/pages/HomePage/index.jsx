export default function HomePage() {
    
    return(
        <div className="flex flex-row p-16">
            <div className="w-5/12 flex flex-col justify-center pl-10 pr-4">
                <h1 className="text-6xl font-bold text-left mb-6">MONITOR DE VARIABLES DE ENTORNO</h1>
                <p className="text-lg font-normal text-justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur voluptas placeat numquam similique ab aperiam fugiat quae quos voluptate deleniti accusantium itaque, quaerat neque asperiores voluptatibus autem ducimus facere. Iste.</p>
            </div>
            <div className="w-7/12 flex items-center justify-center p-10">
                <img src="../../src/assets/dashboard.png" alt="Monitor" className="shadow-2xl rounded-2xl" />
            </div>
        </div>
    )
}