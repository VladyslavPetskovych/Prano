import React from "react";
import Weasel from "../assets/videos/loopWeaselVideo.mp4";

function Premium() {
  return (
    <div className="min-h-screen bg-Ndark pt-36 font-tinos">
      <div className="bg-Ngold">
        <h1 className="text-center text-4xl font-bold py-10 text-Ndark">
          Преміум послуги
        </h1>
      </div>
      <div>
        <video
          src={Weasel}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />

        <div>
          <p>
            Prano Premium — індивідуальний сервіс для речей, які варті
            найкращого догляду: брендові, ексклюзивні, вінтажні або просто
            улюблені — ті, що заслуговують на особливе ставлення. Наші фахівці
            уважно досліджують матеріал, крій та стан кожного виробу, щоб обрати
            найефективніший і водночас безпечний метод очищення чи відновлення.
            Увесь процес — від діагностики до фінального відновлення — контролює
            технолог. Працюємо з одягом Dior, Prada, Chanel, Max Mara, Hugo
            Boss, Tom Ford, Burberry, Brunello Cucinelli, Ralph Lauren, а також
            із взуттям і сумками Chanel, Christian Louboutin, Jimmy Choo, Gucci,
            Bottega Veneta, Hermès, Valentino, Saint Laurent, Louis Vuitton та
            інші. І так само дбайливо ставимось до речей, які для вас безцінні
            незалежно від етикетки. З послугою Prano Premium ми повернемо їм
            вигляд і відчуття "як нових". Улюблене варто зберігати.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Premium;
