// © 2024 Malith Rukshan - https://github.com/Malith-Rukshan

const saveBuffer: {
  clicks?: number;
  energy?: number;
  coins?: number;
  purchases?: any;
} = {};

import { useState, useEffect } from 'react'
import Arrow from './assets/Arrow'

import { useState } from 'react';
// app.tsx
import { useEffect } from 'react';
app.post("/api/save-progress", async (req, res) => {
  const { user_id, progress } = req.body;
  const game = "cureClicker";

  if (!user_id || !progress) {
    return res.status(400).json({ error: "Missing user_id or progress" });
  }

  const { data: existing, error: fetchError } = await supabase
    .from("user_stats")
    .select("games")
    .eq("user_id", user_id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    return res.status(500).json({ error: "Fetch failed" });
  }

  const updatedGames = {
    ...(existing?.games || {}),
    [game]: progress
  };

  const { error: upsertError } = await supabase
    .from("user_stats")
    .upsert({ user_id, games: updatedGames }, { onConflict: ["user_id"] });

  if (upsertError) return res.status(500).json({ error: "Save failed" });

  res.json({ status: "ok" });
});
app.get("/api/get-progress", async (req, res) => {
  const { user_id } = req.query;
  const game = "cureClicker";

  if (!user_id) return res.status(400).send("Missing user_id");

  const { data, error } = await supabase
    .from("user_stats")
    .select("games")
    .eq("user_id", user_id)
    .single();

  if (error) return res.status(500).send("Failed to fetch");

  res.json(data?.games?.[game] || {});
});


const tg = window.Telegram.WebApp;
const userId = tg?.initDataUnsafe?.user?.id || 'anonymous';
const referralLink = `https://t.me/SovereignArcadeBot?start=ref_${userId}`;

const [copied, setCopied] = useState(false);

const copyReferralLink = () => {
  navigator.clipboard.writeText(referralLink);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};
const [copied, setCopied] = useState(false);
const copyLink = () => {
  navigator.clipboard.writeText(referralLink);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

function App() {

const App = () => {
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (!tg) return;

    tg.ready();

    const user = tg.initDataUnsafe?.user;
    const referral = tg.initDataUnsafe?.start_param || null;

    if (!user) return;

    // 🚀 Send to your referral bot backend
    fetch("https://children-of-god-referral-bot.onrender.com"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        telegramId: user.id,
        username: user.username,
        referral,
      })
        
  const [isPressed, setIsPressed] = useState(false);
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(150);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const pointsToAdd = 1;
  const energyToReduce = 1;


  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  const openGithub = () => {
    window.open('https://heavenonearth-16u7md8cc-sonofjaxs-projects.vercel.app');
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

    useEffect(() => {
  const tg = (window as any).Telegram.WebApp;
  tg.ready();

  const userId = tg?.initDataUnsafe?.user?.id;
  if (!userId) return;

  // Load saved data
  fetch(`https://<YOUR-RENDER-URL>/api/get-progress?user_id=${userId}`)
    .then((res) => res.json())
    .then((data) => {
      setClicks(data.clicks || 0);
      setEnergy(data.energy || 100);
      setCoins(data.coins || 0);
      setPurchases(data.purchases || []);
    });

  // Save buffered data every 3 seconds (like Notcoin)
  const interval = setInterval(() => {
    if (!Object.keys(saveBuffer).length) return;

    fetch("https://<YOUR-RENDER-URL>/api/save-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        progress: { ...saveBuffer },
      }),
    });

    for (const key in saveBuffer) delete saveBuffer[key];
  }, 3000);

  return () => clearInterval(interval);
}, []);

  // useEffect hook to restore energy over time
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 300));
    }, 200); // Resporce energy every 500ms

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium" style={{ userSelect: `none` }}>

      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">

        <div className="fixed top-0 left-0 w-full px-6 pt-8 z-10 flex flex-col items-center text-white">
          <div className="w-full cursor-pointer">
            <div className="bg-[#1f1f1f] text-center py-2 rounded-xl backdrop-blur-md">
              <a href="https://t.me/SingleDevelopers">
                <p className="text-lg">Join squad <Arrow size={18} className="ml-0 mb-1 inline-block" /></p>
              </a>
            </div>
          </div>
          <div className="mt-12 text-5xl font-bold flex items-center">
            <img src='./images/coin.png' width={44} height={44} />
            <span className="ml-2">{points.toLocaleString()}</span>
          </div>
          <div className="text-base mt-2 flex items-center">
            <img src='./images/trophy.png' width={24} height={24} />
            <a href="CureClicker" target="_blank" rel="noopener noreferrer">
              <span className="ml-1">Gold <Arrow size={18} className="ml-0 mb-1 inline-block" /></span>
            </a>
          </div>
        </div>


        <div className="fixed bottom-0 left-0 w-full px-6 pb-8 z-10">
          <div className="w-full flex justify-between gap-2">
            <div className="w-1/3 flex items-center justify-start max-w-32">
              <div className="flex items-center justify-center">
                <img src='./images/high-voltage.png' width={44} height={44} alt="High Voltage" />
                <div className="ml-2 text-left">
                  <span className="text-white text-2xl font-bold block">{energy}</span>
                  <span className="text-white text-large opacity-75">/ 6500</span>
                </div>
              </div>
            </div>
            <div className="flex-grow flex items-center max-w-60 text-sm">
              <div className="w-full bg-[#fad258] py-4 rounded-2xl flex justify-around">
                <button className="flex flex-col items-center gap-1" onClick={openGithub}>
               onClick={() => {
    const tg = (window as any).Telegram?.WebApp;
    const user = tg?.initDataUnsafe?.user;

    if (tg && user?.username) {
      const link = `https://t.me/SovereignArcadeBot?start=${user.username}`;
      tg.openTelegramLink(link);
    } else {
      alert("Telegram user info missing");
    }
  }}
                  <img src='./images/bear.png' width={24} height={24} alt="High Voltage"/>
                  <span>Frens</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1" onClick={openGithub}>
                  <img src='./images/coin.png' width={24} height={24} alt="High Voltage" />
                  <span>Earn</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1" onClick={openGithub}>
                  <img src='./images/rocket.png' width={24} height={24} alt="High Voltage" />
                  <span>Boosts</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#f9c035] rounded-full mt-4">
            <div className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full" style={{ width: `${(energy / 6500) * 100}%` }}></div>
          </div>
        </div>


        <div className="flex-grow flex items-center justify-center select-none">
          <div className="relative mt-4"
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp} 
            onTouchCancel={handleMouseUp}>
            <img src='./images/notcoin.png' width={256} height={256} alt="notcoin"
              draggable="false"
              style={{
                pointerEvents: 'none',
                userSelect: 'none',
                transform: isPressed ? 'translateY(4px)' : 'translateY(0px)',
                transition: 'transform 100ms ease',
              }}
              className='select-none'
            />

            <div className="mt-6 text-center">
  <p className="text-white text-sm">Invite frens to unlock boosts 🌟</p>
  <button
    onClick={copyReferralLink}
    className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded-full mt-2"
  >
    📎 Copy Invite Link
  </button>
  {copied && (
    <p className="text-green-400 mt-2 font-semibold">Copied!</p>
  )}
</div>
            {clicks.map((click) => (
              <div
                key={click.id}
                className="absolute text-5xl font-bold opacity-0"
                style={{
                  top: `${click.y - 42}px`,
                  left: `${click.x - 28}px`,
                  animation: `float 1s ease-out`,
                  pointerEvents: `none`
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                {energyToReduce}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
