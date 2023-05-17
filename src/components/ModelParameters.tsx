//hooks
import { useChatState } from "@/hooks/useChatState";

//material
import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Slider,
  Tooltip,
  Checkbox,
} from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function ModelParameters() {
  const [chatState, chatActions] = useChatState();
  const { changeParameters, addCurrentModel, changeWitcChatContext } =
    chatActions;

  const {
    availableModels,
    currentModel,
    parameters,
    withChatContext,
    sendingMessage,
  } = chatState;

  const handleTemperatureChange = (_: Event, newValue: number | number[]) => {
    changeParameters("temperature", newValue as number);
  };

  const handleTopPChange = (_: Event, newValue: number | number[]) => {
    changeParameters("top_p", newValue as number);
  };

  return (
    <Box
      sx={{
        paddingRight: "10px",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "600",
          marginBottom: "10px",
        }}
      >
        Parametros del modelo
      </Typography>
      <FormControl
        fullWidth
        sx={{
          marginBottom: "15px",
        }}
      >
        <InputLabel
          id="select_model"
          sx={{
            fontSize: "13px",
          }}
        >
          Modelo
        </InputLabel>
        <Select
          labelId="select_model"
          value={currentModel.name}
          label="Modelo"
          size="small"
          disabled={sendingMessage ? true : false}
          onChange={(e) => addCurrentModel(e.target.value)}
        >
          {availableModels.map((model, index) => (
            <MenuItem key={index} value={model.name}>
              {model.name} {model.is_free ? "(Free)" : "(Premium)"}
            </MenuItem>
          ))}
        </Select>

        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "5px",
          }}
        >
          <Tooltip title={currentModel.description}>
            <InfoOutlinedIcon sx={{ fontSize: "18px", marginRight: "5px" }} />
          </Tooltip>
          {currentModel.helper}
        </Typography>
      </FormControl>

      {currentModel?.type === "chat" && (
        <FormControl
          fullWidth
          sx={{
            marginBottom: "15px",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip
              title={`Cuando está activado, puede comprender todo el contexto del chat para proporcionar respuestas más precisas, pero esto puede aumentar el costo debido al uso de tokens adicionales. Mientras que, cuando está desactivado, solo considerará el último mensaje enviado, lo que puede resultar en un costo menor`}
            >
              <InfoOutlinedIcon sx={{ fontSize: "18px", marginRight: "5px" }} />
            </Tooltip>
            Contexto
          </Typography>
          <Typography variant="caption">
            {withChatContext
              ? "Entiende el contexto del chat = mas gasto en tokens."
              : "No Entiende el contexto del chat"}
          </Typography>
          <Checkbox
            checked={withChatContext}
            onChange={changeWitcChatContext}
            sx={{
              display: "felx",
              justifyContent: "center",
              alignItems: "center",
              width: "40px",
              height: "40px",
            }}
          />
        </FormControl>
      )}

      <FormControl
        fullWidth
        sx={{
          marginBottom: "15px",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Tooltip
            title={`controla qué tan creativo o sorprendente será la salida. 
            Un valor de temperatura más alto aumenta la probabilidad de que el 
            modelo elija palabras menos comunes y produzca resultados más creativos,
            mientras que un valor de temperatura más bajo hace que el modelo sea más 
            predecible y conservador`}
          >
            <InfoOutlinedIcon sx={{ fontSize: "18px", marginRight: "5px" }} />
          </Tooltip>
          Temperatura
        </Typography>

        <Slider
          value={parameters.temperature}
          min={0}
          max={1}
          step={0.1}
          onChange={handleTemperatureChange}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </FormControl>
      <FormControl
        fullWidth
        sx={{
          marginBottom: "15px",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Tooltip
            title="también se refiere a la creatividad del modelo, 
                pero de una manera diferente a la temperatura. Este parámetro 
                hace que el modelo solo considere las palabras más probables en 
                función de una distribución de probabilidad calculada por el modelo. 
                Un valor de 1 significa que se considerarán todas las palabras posibles"
          >
            <InfoOutlinedIcon sx={{ fontSize: "18px", marginRight: "5px" }} />
          </Tooltip>
          Top P
        </Typography>

        <Slider
          value={parameters.top_p}
          min={0}
          max={1}
          step={0.1}
          onChange={handleTopPChange}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </FormControl>
    </Box>
  );
}
