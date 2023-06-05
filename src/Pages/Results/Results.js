import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { getFormatedTime } from "../../helper";

import "./Result.css";

const Result = ({ 
    questions,
    score,
    timeTaken,
    setScore,
    setTimeTaken 
  }) => {

  const history = useNavigate()

  const restart = () => {
    history("/");
    setScore(0);
    setTimeTaken(60);
  }

  const timer = 60 - timeTaken;

  console.log(score);

  return (
    <div className="result">
    {score > 2 ? (
        <Card sx={{ mt: 5, display: 'flex', width: '100%', maxWidth: 640, mx: 'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
              <Typography variant="h3">Congratulations!</Typography>

              <Typography>
                You aer amazing
              </Typography>

              <Typography sx={{ fontWeight: 600 }}>
                <Typography variant="span">
                  {score}/{questions.length} correct answers
                </Typography>
              </Typography>

              <Typography>
                Took {getFormatedTime(timer) + ''}
              </Typography>
             
              <Button variant="contained"
                sx={{ mx: 1 }}
                color="error"
                size="small"
                onClick={restart}>
                Play Again
              </Button>
            </CardContent>
          </Box>

          <CardMedia
            component="img"
            sx={{ width: 220 }}
            image="../result.png"
          />
        </Card>
      ) : (
        <Card sx={{ mt: 5, display: 'flex', width: '100%', maxWidth: 640, mx: 'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
              <Typography variant="h3">Completed!!</Typography>

              <Typography color="rgba(0,0,0,.54)">
                Better luck next time!
              </Typography>

              <Typography  sx={{ fontWeight: 600 }}>
                <Typography variant="span" color="rgba(0,0,0,.54)">
                  {score}/{questions.length} correct answers
                </Typography>
              </Typography>

              <Typography>
                Took {getFormatedTime(timer)}
              </Typography>
             
              <Button variant="contained"
                sx={{ mx: 1 }}
                color="error"
                size="small"
                onClick={restart}>
                Play Again
              </Button>
             
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 220 }}
            image="../bye.png"
          />
        </Card>
        
      )}
    </div>
  );
};

export default Result;
