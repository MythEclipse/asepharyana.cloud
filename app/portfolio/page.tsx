import { Box, Grid } from '@radix-ui/themes';
import BoxContent from '@/components/box/BoxContent';

export default function page() {
  return (
    <section id="portfolio" className="bg-slate-200 pb-16 pt-36 dark:border-darkb dark:bg-darkb">
      <div className="container">
        <div className="w-full">
          <div className="mx-auto mb-16 max-w-xl text-center">
            <h4 className="mb-2 text-lg font-semibold text-primary-600">Portfolio</h4>
            <h2 className="mb-4 text-3xl font-bold text-dark dark:text-gray-100">Project terbaru</h2>
            <p className="text-md font-medium text-secondary">Berikut adalah kumpulan Project yang saya buat</p>
          </div>
        </div>
        <Grid columns={{ initial: '1', md: '2', lg: '2' }} gap="3" width="auto">
          <Box>
            <BoxContent
              gambar="/Project1.png"
              href="/login"
              judul="Login Page"
              description="fungsi login dengan register yang berfungsi secara seharusnya"
            />
          </Box>
          <Box>
            <BoxContent gambar="/Project1.png" href="/cekkhodam" judul="cekkhodam" description="cekkhodam" />
          </Box>
          <Box>
            <BoxContent gambar="/Project1.png" href="/feedback" judul="crudtest" description="Crudtest" />
          </Box>
        </Grid>
      </div>
    </section>
  );
}
