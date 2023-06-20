import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Component = () => {
  return (
    <>
        <div className="component-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-4" style={{ marginBottom: '30px' }}>
                      <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    On scroll Sticky
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Link to="/components/sticky"><Button size="small">Learn More</Button></Link>
                            </CardActions>
                        </Card>
                      </div>
                      
                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    On scroll show content
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Link to="/components/showcontent"><Button size="small">Learn More</Button></Link>
                            </CardActions>
                        </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Accordion
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Link to="/components/accordion"><Button size="small">Learn More</Button></Link>
                            </CardActions>
                        </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Live color change
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Link to="/components/livecolorchage"><Button size="small">Learn More</Button></Link>
                            </CardActions>
                        </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                          <Card>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      Upload Image Preview
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      Lizards are a widespread group of squamate reptiles, with over 6,000
                                      species, ranging across all continents except Antarctica
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Share</Button>
                                  <Link to="/components/uploadimagepreivew"><Button size="small">Learn More</Button></Link>
                              </CardActions>
                          </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                          <Card>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      Either Image or Text
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      Lizards are a widespread group of squamate reptiles, with over 6,000
                                      species, ranging across all continents except Antarctica
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Share</Button>
                                  <Link to="/components/eitherimageortext"><Button size="small">Learn More</Button></Link>
                              </CardActions>
                          </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                          <Card>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      Form Validation
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      Lizards are a widespread group of squamate reptiles, with over 6,000
                                      species, ranging across all continents except Antarctica
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Share</Button>
                                  <Link to="/components/formvalidation"><Button size="small">Learn More</Button></Link>
                              </CardActions>
                          </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                          <Card>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      Calculator Simple
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      Lizards are a widespread group of squamate reptiles, with over 6,000
                                      species, ranging across all continents except Antarctica
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Share</Button>
                                  <Link to="/components/calculator"><Button size="small">Learn More</Button></Link>
                              </CardActions>
                          </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                          <Card>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      Async Await API
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      Lizards are a widespread group of squamate reptiles, with over 6,000
                                      species, ranging across all continents except Antarctica
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Share</Button>
                                  <Link to="/components/asyncawaitapi"><Button size="small">Learn More</Button></Link>
                              </CardActions>
                          </Card>
                      </div>
                      
                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                          <Card>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      Axios API
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      Lizards are a widespread group of squamate reptiles, with over 6,000
                                      species, ranging across all continents except Antarctica
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Share</Button>
                                  <Link to="/components/axiosapi"><Button size="small">Learn More</Button></Link>
                              </CardActions>
                          </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                          <Card>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      API Data Show With Condition
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      Lizards are a widespread group of squamate reptiles, with over 6,000
                                      species, ranging across all continents except Antarctica
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Share</Button>
                                  <Link to="/components/apidatashowwithcondition"><Button size="small">Learn More</Button></Link>
                              </CardActions>
                          </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                          <Card>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      Custom Modal
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      Here I create custom modal If you want to show this modal, you have open the AsyncAPI modal.
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Share</Button>
                                  <Link to="/components/custommodal"><Button size="small">Learn More</Button></Link>
                              </CardActions>
                          </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                          <Card>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      Custom Tooltip
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      Here I create custom tooltip If you want to show this tooltip, you have open the AsyncAPI modal.
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Share</Button>
                                  <Link to="/components/customtooltip"><Button size="small">Learn More</Button></Link>
                              </CardActions>
                          </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                          <Card>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      Slick Carousel
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      Lizards are a widespread group of squamate reptiles, with over 6,000
                                      species, ranging
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Share</Button>
                                  <Link to="/components/slickcarousel"><Button size="small">Learn More</Button></Link>
                              </CardActions>
                          </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                          <Card>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      CK Editor
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      Lizards are a widespread group of squamate reptiles, with over 6,000
                                      species, ranging
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Share</Button>
                                  <Link to="/components/ckEditor"><Button size="small">Learn More</Button></Link>
                              </CardActions>
                          </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                          <Card>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      Use Memo Hook
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      useMemo Hook returns a memoized value. The useMemo Hook only runs when one of its dependencies is updated.
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Share</Button>
                                  <Link to="/components/useMemo"><Button size="small">Learn More</Button></Link>
                              </CardActions>
                          </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                          <Card>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      Use Callback Hook
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      useCallback Hook returns a memoized callback function. The useCallback Hook only runs when one of its dependencies updated. 
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Share</Button>
                                  <Link to="/components/useCallback"><Button size="small">Learn More</Button></Link>
                              </CardActions>
                          </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                          <Card>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      Custom Hooks
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      Hooks are reusable functions. When you have component logic that needs to be used by multiple components, we can extract that logic to a custom Hook.
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Share</Button>
                                  <Link to="/components/customHooks"><Button size="small">Learn More</Button></Link>
                              </CardActions>
                          </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                          <Card>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      useLayout Hooks
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      Hooks are reusable functions. When you have component logic that needs to be used by multiple components, we can extract that logic to a custom Hook.
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Share</Button>
                                  <Link to="/components/useLayouthook"><Button size="small">Learn More</Button></Link>
                              </CardActions>
                          </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                          <Card>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      useRef Hooks
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      It can be used to store a mutable value that does not cause a re-render when updated. it can be retun an object as current.<br>
                                      </br> To access a dom element directly
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Share</Button>
                                  <Link to="/components/useRefhook"><Button size="small">Learn More</Button></Link>
                              </CardActions>
                          </Card>
                      </div>

                      <div className="col-md-4" style={{ marginBottom: '30px' }}>
                          <Card>
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      Main menu with dropdown
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      It can be used to store a mutable value that does not cause a re-render when updated. it can be retun an object as current.<br>
                                      </br> To access a dom element directly
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Share</Button>
                                  <Link to="/components/mainmenuwithDropdown"><Button size="small">Learn More</Button></Link>
                              </CardActions>
                          </Card>
                      </div>


                </div>
            </div>
        </div>
    </>
  )
}

export default Component