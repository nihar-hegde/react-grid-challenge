import React from "react";
import { Button } from "./components/button";
import { Input } from "./components/input";
import { z } from "zod";
import { Grid } from "./components/grid";

const App: React.FC = () => {
  const [size, setSize] = React.useState<number | null>(null);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parseData = z
      .number({
        coerce: true,
      })
      .positive()
      .min(1)
      .safeParse(formData.get("grid"));

    if (parseData.success) {
      setSize(parseData.data);
    }
  }

  return (
    <section className="flex flex-col w-full h-screen items-center justify-center">
      <form onSubmit={handleSubmit}>
        <label className="flex flex-col">
          Grid Size
          <Input type="number" min="1" max="100" name="grid" />
        </label>
        <Button>Create Grid</Button>
      </form>

      {size !== null && <Grid size={size} />}
    </section>
  );
};

export default App;
