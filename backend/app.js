import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

const loggedAttempts = [];

const static_number = 42;

app.post("/guess", (req, res) => {
  const { number, tries } = req.body;

  console.log(req.body);

  if (typeof number !== "number" || number < 1 || number > 50) {
    return res.status(400).json({
      success: false,
    message: "Invalid input. Please enter a number between 1 and 50.",
    });
  }


  loggedAttempts.push(number);

  if (number === static_number) {
    res.send({
        success: true,
      message: "🎉Congratulations! You guessed the correct number",
      loggedAttempts,
    });
  } else if (tries <= 0) {
    res.send({
        success: false,
      message: "You have reached the maximum number of attempts",
      loggedAttempts,
    });
  }

  const hint = number < static_number ? '🔽 Too low!' : '🔼 Too high!';
  return res.json({
      success: false,
      message: `${hint} You have ${tries - 1} tries left.`,
      loggedAttempts,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
