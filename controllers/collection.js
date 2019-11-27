const express = require("express");
const router = express.Router();
const Game = require("../models/games.js");
const Tag = require("../models/tags.js");

// Seed Routes
router.get("/seed", async (req, res) => {
  const newGames = [
    {
      name: "Exploding Kittens",
      description:
        "Exploding Kittens is a kitty-powered version of Russian Roulette. Players take turns drawing cards until someone draws an exploding kitten and loses the game. The deck is made up of cards that let you avoid exploding by peeking at cards before you draw, forcing your opponent to draw multiple cards, or shuffling the deck.",
      img:
        "https://cf.geekdo-images.com/imagepage/img/2YIM7lVh-ZblHsCv7YFViuPOJ2c=/fit-in/900x600/filters:no_upscale()/pic2691976.png",
      playersMin: 1,
      playersMax: 5,
      weight: 1.07,
      rating: 3,
      tags: []
    },
    {
      name: "Terraforming Mars",
      description:
        "In the 2400s, mankind begins to terraform the planet Mars. Giant corporations, sponsored by the World Government on Earth, initiate huge projects to raise the temperature, the oxygen level, and the ocean coverage until the environment is habitable. In Terraforming Mars, you play one of those corporations and work together in the terraforming process, but compete for getting victory points that are awarded not only for your contribution to the terraforming, but also for advancing human infrastructure throughout the solar system, and doing other commendable things.",
      img:
        "https://cf.geekdo-images.com/imagepage/img/sgZLoyg3KKeHvyHel8tZ2TIkXRw=/fit-in/900x600/filters:no_upscale()/pic3536616.jpg",
      playersMin: 1,
      playersMax: 5,
      weight: 3.23,
      rating: 4.5,
      tags: []
    },
    {
      name: "Betrayal at House on the Hill",
      description:
        "Betrayal at House on the Hill quickly builds suspense and excitement as players explore a haunted mansion of their own design, encountering spirits and frightening omens that foretell their fate. With an estimated one hour playing time, Betrayal at House on the Hill is ideal for parties, family gatherings or casual fun with friends.",
      img:
        "https://cf.geekdo-images.com/imagepagezoom/img/RHWp20524q1PoDXgshJ4VZP2z90=/fit-in/1200x900/filters:no_upscale()/pic828598.jpg",
      playersMin: 3,
      playersMax: 6,
      weight: 2.37,
      rating: 2,
      tags: []
    }
  ];

  try {
    const seedGames = await Game.create(newGames);
    res.send(seedGames);
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/seed/tags", async (req, res) => {
  const newTags = [
    {
      name: "Competitive"
    },
    {
      name: "Cooperative"
    },
    {
      name: "Semi-Cooperative"
    },
    {
      name: "Solitaire"
    },
    {
      name: "Social Deduction"
    }
  ];

  try {
    const seedTags = await Tag.create(newTags);
    res.send(seedTags);
  } catch (err) {
    res.send(err.message);
  }
});

// New route
router.get("/new", (req, res) => {
  Tag.find({}, (err, allTags) => {
    res.render("new.ejs", {
      tags: allTags
    });
  });
});

//Create
router.post("/", (req, res) => {
  Game.create(req.body, (err, createdGame) => {
    console.log(req.body);
    if (err) console.log(err.message);
    res.redirect("/games");
  });
});

// Index Route
router.get("/", (req, res) => {
  Game.find({}, (err, allGames) => {
    if (err) console.error(err.message);
    else {
      res.render("index.ejs", {
        games: allGames
      });
    }
  });
});

// API Index route
router.get("/api", (req, res) => {
  Game.find({}, (err, allGames) => {
    if (err) console.error(err.message);
    else {
      res.json(allGames);
    }
  });
});

//Show route
router.get("/:id", (req, res) => {
  /*Game.findById(req.params.id, (err, foundGame) => {
    // console.log(foundGame);
    // res.render("show.ejs", {
    //   game: foundGame
    // });

    console.log(foundGame.tags);

    Tag.findById(foundGame.tags, (err, foundTag) => {
      res.render("show.ejs", {
        game: foundGame,
        tag: foundTag
      });
    });
  });*/
  Game.findById(req.params.id)
    .populate("tags")
    .exec((err, foundGame) => {
      res.render("show.ejs", {
        game: foundGame
      });
    });
});

//Delete route
router.delete("/:id", (req, res) => {
  Game.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/games");
  });
});

//Edit route . Direct to edit page
router.get("/:id/edit", (req, res) => {
  Game.findById(req.params.id, (err, foundGame) => {
    //find the product
    res.render("edit.ejs", {
      game: foundGame
    });
  });
});

// Update route
router.put("/:id", (req, res) => {
  Game.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedItem) => {
      res.redirect("/games/" + req.params.id);
    }
  );
});

module.exports = router;
