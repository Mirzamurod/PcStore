import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Box, Button, Container, Grid, Typography } from '@mui/material'

const Sidebar = ({ items, title, baseUrl, id }) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    const { dark_mode } = useSelector(state => state.login)

    let chooseItem = items.find(item => baseUrl + item.link === location.pathname)

    return (
        <Container id={id} sx={{ mb: 5 }}>
            <Grid container spacing={4}>
                <Grid item md={3} position='sticky' top={0}>
                    <Box
                        border={`1px solid ${dark_mode ? '#e2e4e5' : 'gray'}`}
                        borderRadius={2}
                        height='calc(100vh - 100px)'
                        position='sticky'
                        top='64px'
                        overflow='hidden'
                    >
                        <Typography variant='body1' fontWeight={700} textAlign='center' my={3}>
                            {t(title)}
                        </Typography>
                        {items.map(button => (
                            <Button
                                key={button.link}
                                color={
                                    location.pathname === baseUrl + button.link
                                        ? 'error'
                                        : 'inherit'
                                }
                                variant={classNames({
                                    contained: location.pathname === baseUrl + button.link,
                                })}
                                onClick={() => navigate(baseUrl + button.link)}
                                fullWidth
                                startIcon={button.icon}
                                sx={{
                                    fontSize: 14,
                                    justifyContent: 'left',
                                    height: 50,
                                    pl: 3,
                                }}
                            >
                                {t(button.name)}
                            </Button>
                        ))}
                    </Box>
                </Grid>
                <Grid item md={9}>
                    {chooseItem ? (
                        chooseItem.element
                    ) : (
                        <Typography variant='h4' color='red'>
                            Something went wrong!!!
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Sidebar
