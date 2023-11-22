import React, { useEffect } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { setPage } from "../../feature/user/authSlice";

const PetCarePage = () => {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setPage({page:"instruction"}))
    },[])
  return (
    <>
      <div className="dash-board">
        <div className="pet-heading">
          <h1>Instructions and Precautions</h1>
        </div>

        <div className="petItemContainer pet-care-info">
          <h1>Food and Water</h1>
          <p>
            Dogs and cats need food specially formulated for them. It is a
            mistake to assume that they will do well on a diet of “people food”
            or that they should hunt for their meals.
            Get guidance from your veterinarian as animals’ needs vary greatly.
            There is also literature and information available at your pet
            store. Purchase your pet food upon approval of your adoption
            request, so you can be with your pet on its journey to a new home
            and family.
          </p>

          <h1>A Safe Environment</h1>
          <p>
            Consider where your pet will live. Even if it lives indoors, you
            will need to be sure that when outside, your pet is safe. Animals
            need protection from extreme heat and cold, direct sunlight, high
            humidity, strong rain, wind, snow, and ice. Do you have a fence, and
            if so, what is the height? A fence can help to keep your pet within
            the safety of your home. Also, be certain that proper ID tags are on
            your pet.
          </p>

          <h1>Veterinary Care</h1>
          <p>
            Veterinary care is as important to your pet as medical care is to
            you. So much can be done to help your pet live the highest quality
            of life possible. Please have your pet spayed or neutered, and help
            them live longer by getting vaccinations - such as for rabies. Visit
            MaxFund Wellness Center for more information on a veterinary care
            plan suitable for your pet.
          </p>

          <h1>Exercise</h1>
          <p>
            Physical exercise is important to the health and well-being of
            animals. While your pets may explore your backyard, they may still
            need the encouragement of a guided walk. Because each animal has
            different medical factors, ask your veterinarian about the
            appropriate length of walk for your pet. Playtime can help to
            stimulate the mind of your cat or dog and assist in developing a
            loving bond between you and your pet.
          </p>

          <h1>General Care</h1>
          <p>
            Pets need assistance with grooming and caring for their bodies. Dogs
            need regular grooming (this can vary on the length of their coat),
            bathing, and cleansing of teeth and ears, and may need to have their
            nails clipped. Cats are often more capable of grooming themselves,
            however, may also have additional needs. All pets should have a
            regular checkup with the veterinarian - when you can ask specific
            questions. There are many good groomers that can help to keep your
            pet looking its best.
          </p>

          <h1>Consistency and Attention</h1>
          <p>
            Animals need consistent expressions, rules, and results to learn
            what is expected of them. They want to please and it boosts their
            morale to know that they have completed your command. They need to
            be treated fairly to know that their owner is trustworthy. By
            nature, many animals are born with happy and outgoing dispositions.
            Abuse can change this into fear, nervousness, and aggressive and
            unpredictable behavior. Pets adopted from shelters may need
            additional care and guidance to begin to trust people again. Your
            love and consistency can help to give your pet a new life.
          </p>
        </div>
      </div>
    </>
  );
};

export default PetCarePage;
